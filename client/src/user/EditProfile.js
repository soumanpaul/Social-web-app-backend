import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { CardActions, CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import PublishIcon from "@material-ui/icons/Publish";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing( 5),
    paddingBottom: theme.spacing( 2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing( 2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto"
  },
  input: {
    display: "none"
  },
  filename: {
    marginLeft: "10px"
  }
});

class EditProfile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      about: "",
      photo: ''
    };
    this.match = match;
  }

  componentDidMount = () => {
    this.userData = new FormData();
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.match.params.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
          photo: data.photo
        });
      }
    });
  };
  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    // const user = {
    //   name: this.state.name || undefined,
    //   about: this.state.about || undefined,
    //   email: this.state.email || undefined,
    //   password: this.state.password || undefined
    // };
    update(
      {
        userId: this.match.params.userId
      },{
        t: jwt.token
      },
      this.userData
    ).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ userId: data._id,  redirectToProfile: true });
      }
    });
  };

  handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.userData.set(name, value);
    this.setState({ [name]: value });
  };
  render() {
    const { classes } = this.props;
    const photoUrl = this.state.id
      ? `/api/v1/users/photo/${this.state.id}?${new Date().getTime()}`
      : "/api/v1/users/defaultphoto";
    if (this.state.redirectToProfile) {
      return <Redirect to={"/user/" + this.state.userId} />;
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <Avatar src={photoUrl} className={classes.bigAvatar} />
          <br />
          <input
            accept="image/*"
            onChange={this.handleChange("photo")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Upload
              <PublishIcon />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {this.state.photo ? this.state.photo.name : ""}
          </span>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            className={classes.textField}
            // rows="2"
            value={this.state.about}
            onChange={this.handleChange("about")}
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
          />
          <br />
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange("password")}
            margin="normal"
          />
          <br />{" "}
          {this.state.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {this.state.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="raised"
            onClick={this.clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
