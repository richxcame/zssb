package main

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

var JWT_SECRET = []byte("more")

type Admin struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-"`
	Username  string         `json:"username"`
	Password  string         `json:"password"`
}

type Claims struct {
	ID uint `json:"id"`
	jwt.RegisteredClaims
}

type Lang struct {
	TK string `json:"tk"`
	EN string `json:"en"`
	RU string `json:"ru"`
}

type Category struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-"`
	Title     Lang           `json:"title" gorm:"embedded;embeddedPrefix:title_"`
	IsActive  bool           `json:"is_active"`
}

type Product struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-"`
	Title       Lang           `json:"title" gorm:"embedded;embeddedPrefix:title_"`
	Price       float64        `json:"price"`
	Description Lang           `json:"description" gorm:"embedded;embeddedPrefix:description_"`
	CategoryID  uint           `json:"category_id"`
	Category    *Category      `json:"category"`
	Image       string         `json:"image"`
	IsActive    bool           `json:"is_active"`
}

type Login struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

var DB *gorm.DB

func main() {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Product{})
	db.AutoMigrate(&Category{})
	db.AutoMigrate(&Admin{})

	// Create admin
	db.Create(&Admin{Username: "admin", Password: "more"})

	r := gin.Default()
	r.Use(CORS())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/products", Auth(), func(c *gin.Context) {
		var product Product

		if err := c.BindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		if err := db.Omit("id").Create(&product).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, product)

	})

	r.GET("/products", func(c *gin.Context) {
		var products []Product

		mainQuery := db.
			Model(&Product{}).
			Where("is_active = ?", true)

		categoryIDs := c.QueryArray("category_ids")

		if len(categoryIDs) > 0 {
			mainQuery.Where("category_id in ?", categoryIDs)
		}

		var total int64

		if err := mainQuery.
			Count(&total).
			Scopes(Paginate(c.Request)).
			Find(&products).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"products": products,
			"total":    total,
		})
	})

	r.PUT("/products/:id", Auth(), func(c *gin.Context) {
		var product Product
		id := c.Param("id")
		if err := db.Where("id = ?", id).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := c.BindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		product.ID = StrToUint(id)
		if err := db.Save(&product).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, product)
	})

	r.DELETE("/products/:id", Auth(), func(c *gin.Context) {
		id := c.Param("id")
		var product Product
		if err := db.Where("id = ?", id).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := db.
			Clauses(clause.Returning{Columns: []clause.Column{{Name: "id"}}}).
			Where("id = ?", id).Delete(&product).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, product)
	})

	r.POST("/categories", Auth(), func(c *gin.Context) {
		var category Category

		if err := c.BindJSON(&category); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		if err := db.Omit("id").Create(&category).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, category)

	})

	r.GET("/categories", func(c *gin.Context) {
		var categories []Category

		mainQuery := db.
			Model(&Category{})

		var total int64

		if err := mainQuery.
			Count(&total).
			Scopes(Paginate(c.Request)).
			Find(&categories).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"categories": categories,
			"total":      total,
		})
	})

	r.PUT("/categories/:id", Auth(), func(c *gin.Context) {
		var category Category
		id := c.Param("id")
		if err := db.Where("id = ?", id).First(&category).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := c.BindJSON(&category); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		category.ID = StrToUint(id)
		if err := db.Save(&category).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, category)
	})

	r.DELETE("/categories/:id", Auth(), func(c *gin.Context) {
		id := c.Param("id")
		var category Category
		if err := db.Where("id = ?", id).First(&category).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := db.
			Clauses(clause.Returning{Columns: []clause.Column{{Name: "id"}}}).
			Where("id = ?", id).Delete(&category).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, category)
	})

	r.POST("/auth/login", func(c *gin.Context) {
		var login Login
		err := c.BindJSON(&login)
		if err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		var admin Admin
		err = db.Where("username = ?", login.Username).First(&admin).Error
		if err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}

		if login.Password != admin.Password {
			c.JSON(http.StatusBadRequest, "wrong password")
			return
		}

		t := jwt.NewWithClaims(jwt.SigningMethodHS256,
			jwt.MapClaims{
				"id": admin.ID,
			})

		token, err := t.SignedString(JWT_SECRET)
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"token": token,
		})
	})

	r.GET("/auth/me", Auth(), func(c *gin.Context) {
		var admin Admin
		ID, hasID := c.Get("id")
		if !hasID {
			c.JSON(http.StatusBadRequest, "id is required")
			return
		}
		if err := db.Omit("password").First(&admin, "id=?", ID).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
		}
		c.JSON(http.StatusOK, gin.H{
			"id":       admin.ID,
			"username": admin.Username,
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080

}

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims := &Claims{}
		var token string

		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, "Token is required")
			return
		}

		splitToken := strings.Split(authHeader, "Bearer ")
		if len(splitToken) > 1 {
			token = splitToken[1]
		} else {
			c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid token")
			return
		}

		tkn, err := jwt.ParseWithClaims(token, claims, func(t *jwt.Token) (interface{}, error) {
			return JWT_SECRET, nil
		})
		if err != nil {
			if strings.Contains(err.Error(), "token is expired") {
				c.AbortWithStatusJSON(http.StatusForbidden, "Token expired")
				return
			}
			c.AbortWithStatusJSON(http.StatusBadRequest, "Cannot parse token")
			return

		}

		if !tkn.Valid {
			c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid token")
			return
		}
		c.Set("id", claims.ID)

		c.Next()
	}
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Set("is_admin", true)
		c.Next()
	}
}

func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		q := r.URL.Query()

		offset, err := strconv.Atoi(q.Get("offset"))
		if err != nil {
			offset = 0
		}

		limit, err := strconv.Atoi(q.Get("limit"))
		if err != nil {
			limit = 10
		}

		return db.Offset(offset).Limit(limit)
	}
}

func StrToUint(num string) uint {
	newInt, _ := strconv.ParseUint(num, 10, 32)
	return uint(newInt)
}
