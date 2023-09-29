package main

import (
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
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
}

type Order struct {
	ID        uint            `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time       `json:"created_at"`
	UpdatedAt time.Time       `json:"updated_at"`
	DeletedAt gorm.DeletedAt  `json:"-"`
	Phone     string          `json:"phone"`
	Address   string          `json:"address"`
	Comment   string          `json:"comment"`
	Products  []*OrderProduct `json:"products"`
}

type OrderProduct struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-"`
	ProductID uint           `json:"product_id"`
	Product   Product        `json:"product" gorm:"foreignKey:ProductID;references:ID"`
	OrderID   uint           `json:"order_id"`
	Quantity  uint           `json:"quantity"`
}

type News struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-"`
	PublishedAt time.Time      `json:"published_at"`
	Title       Lang           `json:"title" gorm:"embedded;embeddedPrefix:title_"`
	Description Lang           `json:"description" gorm:"embedded;embeddedPrefix:description_"`
	Image       string         `json:"image"`
	IsArticle   bool           `json:"is_article"`
}

type Partner struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `json:"-"`
	Title     Lang           `json:"title" gorm:"embedded;embeddedPrefix:title_"`
	Link      string         `json:"link"`
	Image     string         `json:"image"`
	IsActive  bool           `json:"is_active"`
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
	db.AutoMigrate(&OrderProduct{})
	db.AutoMigrate(&Order{})
	db.AutoMigrate(&News{})
	db.AutoMigrate(&Partner{})

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

		mainQuery := db.Model(&Product{})

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

	r.GET("/categories/:id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		var category Category
		if err := db.Where("id = ?", id).First(&category).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		c.JSON(http.StatusOK, category)
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

	r.GET("/products/:id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		var product Product
		if err := db.Where("id = ?", id).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		c.JSON(http.StatusOK, product)
	})

	r.POST("products/:id/image", Auth(), func(c *gin.Context) {
		id := c.Param("id")
		var product Product
		imageURL, err := FileUpload(c, "image", "/products")
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		if err := db.Where("id = ?", id).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		product.Image = imageURL
		if err := db.Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, product)
	})

	r.DELETE("products/:id/image", Auth(), func(c *gin.Context) {
		id := c.Param("id")
		var product Product
		wd, _ := os.Getwd()

		if err := db.Where("id = ?", id).First(&product).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		olderURL := product.Image
		product.Image = ""

		if err := db.Save(&product).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		os.Remove(wd + olderURL)

		c.JSON(http.StatusOK, product)
	})

	r.POST("/orders", func(c *gin.Context) {
		var order Order

		if err := c.BindJSON(&order); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		if err := db.Omit("id").Create(&order).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, order)
	})

	r.GET("/orders", func(c *gin.Context) {
		var orders []Order

		mainQuery := db.Model(&Order{})

		var total int64

		if err := mainQuery.
			Count(&total).
			Scopes(Paginate(c.Request)).
			Preload("OrderProducts.Products").
			Find(&orders).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"orders": orders,
			"total":  total,
		})
	})

	r.POST("/news", func(c *gin.Context) {
		var news News

		if err := c.BindJSON(&news); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		if err := db.Omit("id").Create(&news).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, news)
	})

	r.GET("/news", func(c *gin.Context) {
		var news []News

		mainQuery := db.
			Model(&News{}).
			Order("created_at desc")

		var total int64

		if err := mainQuery.
			Count(&total).
			Scopes(Paginate(c.Request)).
			Find(&news).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"news":  news,
			"total": total,
		})
	})

	r.GET("/news/:id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		var news News
		if err := db.Where("id = ?", id).First(&news).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		c.JSON(http.StatusOK, news)
	})

	r.PUT("/news/:id", func(c *gin.Context) {
		var news News
		id := c.Param("id")
		if err := db.Where("id = ?", id).First(&news).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := c.BindJSON(&news); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		news.ID = StrToUint(id)
		if err := db.Save(&news).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, news)
	})

	r.DELETE("/news/:id", func(c *gin.Context) {
		id := c.Param("id")
		var news News
		if err := db.Where("id = ?", id).First(&news).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := db.
			Clauses(clause.Returning{Columns: []clause.Column{{Name: "id"}}}).
			Where("id = ?", id).Delete(&news).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, news)
	})

	r.POST("/news/:id/image", func(c *gin.Context) {
		id := c.Param("id")
		var news News
		imageURL, err := FileUpload(c, "image", "news/")
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		if err := db.Where("id = ?", id).First(&news).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		news.Image = imageURL
		if err := db.Save(&news).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, news)
	})

	r.DELETE("/news/:id/image", func(c *gin.Context) {
		id := c.Param("id")
		var news News
		wd, _ := os.Getwd()

		if err := db.Where("id = ?", id).First(&news).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		olderURL := news.Image
		news.Image = ""

		if err := db.Save(&news).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		os.Remove(wd + olderURL)

		c.JSON(http.StatusOK, news)
	})

	r.POST("/partners", func(c *gin.Context) {
		var partner Partner

		if err := c.BindJSON(&partner); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		if err := db.Omit("id").Create(&partner).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, partner)
	})

	r.GET("/partners", func(c *gin.Context) {
		var partners []Partner

		if err := db.Order("created_at desc").Where("is_active = ?", true).Find(&partners).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"partners": partners,
		})
	})

	r.GET("/partners/:id", func(c *gin.Context) {
		id := c.Params.ByName("id")
		var partner Partner
		if err := db.Where("id = ?", id).First(&partner).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		c.JSON(http.StatusOK, partner)
	})

	r.PUT("/partners/:id", func(c *gin.Context) {
		var partner Partner
		id := c.Param("id")
		if err := db.Where("id = ?", id).First(&partner).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := c.BindJSON(&partner); err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		partner.ID = StrToUint(id)
		if err := db.Save(&partner).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, partner)
	})

	r.DELETE("/partners/:id", func(c *gin.Context) {
		id := c.Param("id")
		var partner Partner
		if err := db.Where("id = ?", id).First(&partner).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		if err := db.
			Clauses(clause.Returning{Columns: []clause.Column{{Name: "id"}}}).
			Where("id = ?", id).Delete(&partner).Error; err != nil {
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK, partner)
	})

	r.POST("/partners/:id/image", func(c *gin.Context) {
		id := c.Param("id")
		var partner Partner
		imageURL, err := FileUpload(c, "image", "partners/")
		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		if err := db.Where("id = ?", id).First(&partner).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		partner.Image = imageURL
		if err := db.Save(&partner).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		c.JSON(http.StatusOK, partner)
	})

	r.DELETE("/partners/:id/image", func(c *gin.Context) {
		id := c.Param("id")
		var partner Partner
		wd, _ := os.Getwd()

		if err := db.Where("id = ?", id).First(&partner).Error; err != nil {
			c.JSON(http.StatusNotFound, err.Error())
			return
		}
		olderURL := partner.Image
		partner.Image = ""

		if err := db.Save(&partner).Error; err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}

		os.Remove(wd + olderURL)

		c.JSON(http.StatusOK, partner)
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

func FileUpload(c *gin.Context, name string, dest string) (url string, err error) {
	file, err := c.FormFile(name)

	// The file cannot be received.
	if err != nil {
		return "", err
	}

	// Retrieve file information
	extension := filepath.Ext(file.Filename)
	newFileName := uuid.New().String() + extension

	// Current working directory
	wd, _ := os.Getwd()
	// The file is received, so let's save it
	if err := c.SaveUploadedFile(file, wd+"/uploads/"+dest+newFileName); err != nil {
		return "", err
	}
	url = "/uploads/" + dest + newFileName

	return url, nil
}
