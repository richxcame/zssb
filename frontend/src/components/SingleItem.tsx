import React from "react";
import { useSelector, useDispatch } from "react-redux";
import url from '@/assets/banner.jpg'
import {
   Grid,
   Typography,
   makeStyles,
   Button,
   alpha,
   Chip,
} from "@material-ui/core";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
   container: {
      padding: theme.spacing(4),
      justifyContent: "space-around",
      height: "auto",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
         padding: theme.spacing(10),
      },
   },
   imgContainer: {
      width: "100%",
      height: "auto",
      boxShadow: theme.shadows[3],
   },
   img: {
      width: "100%",
      height: "auto",
   },
   marginTopTwo: {
      marginTop: theme.spacing(2),
   },
   paleText: {
      color: alpha("#333", 0.8),
   },
   letterSpace: {
      letterSpacing: 2.5,
   },
}));

const SingleProduct = () => {

   const classes = useStyles();

   const dispatch = useDispatch();

   const item = {
      title : 'Fruits and vegetables',
      category : "Fruits and vegetables",
      description  : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit odio facere obcaecati distinctio dolorum, placeat, porro dolores repellendus voluptatibus, recusandae deserunt molestias? Velit cum odit pariatur soluta autem ducimus tempora.',
      price : '129',
   }

   return (
      <Grid container className={classes.container}>
         <Grid item xs={12} sm={4}>
            <div className={classes.imgContainer}>
               <img src={url} alt={item.title} className={classes.img} />
            </div>
         </Grid>
         <Grid item xs={12} sm={6}>
            <Typography className={classes.marginTopTwo} variant="h4">
               {item.title}
            </Typography>

            <Chip
               label={item.category}
               variant="outlined"
               className={classes.marginTopTwo}
            />
            <Typography
               className={classNames(classes.paleText, classes.marginTopTwo)}
               variant="body1"
            >
               {item.description}
            </Typography>
            <Typography className={classes.marginTopTwo} variant="subtitle2">
               ${item.price}
            </Typography>

            <Button
               className={classNames(classes.letterSpace, classes.marginTopTwo)}
               fullWidth
               variant="contained"
               color="primary"
            >
               Add to Cart
            </Button>
         </Grid>
      </Grid>
   );
};

export default SingleProduct;
