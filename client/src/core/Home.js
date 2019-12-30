import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardContent , CardMedia} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import seashellImg from "./../assets/images/seashell.jpg";

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Typography type="headline" component="h2" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia
            className={classes.media}
            image={seashellImg}
            title="Unicorn Shells"
          />
          <CardContent>
            <Typography type="body1" component="p">
              Welcome to the Mern Skeleton home page
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};


const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px
  ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

export default withStyles(styles)(Home);

