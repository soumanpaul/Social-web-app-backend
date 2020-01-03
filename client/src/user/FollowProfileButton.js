import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {unfollow, follow} from './api-user.js'

class FollowProfileButton extends Component {
  followClick = () => {
    console.log("clicked follow...")
    this.props.onButtonClick(follow);
  };
  unfollowClick = () => {
    this.props.onButtonClick(unfollow);
  };
  render() {
    return (
      <div>
        {this.props.following ? (
          <Button
            variant="contained"
            color="secondary"
            onClick={this.unfollowClick}
          >
            Unfollow
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={this.followClick()}>
            Follow
          </Button>
        )}
      </div>
    );
  }
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

export default FollowProfileButton;
