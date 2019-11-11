//Import React
import React, { Component } from 'react';
//Import Basic React Native Component
import { Platform, StyleSheet, Text, View } from 'react-native';
//Import React Native Video to play video
import Video from 'react-native-video';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
// For navigation between pages
import { NativeRouter, Route, Link } from "react-router-native";
// Splash: root screen which greets users
class Splash extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link style={{flex: 1, flexDirection: "row"}} to="/VideoPlayer">
        <View style={{flex: 1, flexDirection: "row"}}>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'grey'}}/>
          <View style={{flex: 100, flexDirection: "column", justifyContent: "center", backgroundColor: 'powderblue'}}>
            <Text style={{textAlign: "center", textAlignVertical: "center"}}>Tap To Get Started</Text>
          </View>
        </View>
      </Link>
    );
  }
}
// VideoPlayer: plays testing video
class VideoPlayer extends Component {
  videoPlayer;
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: true,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
    };
  }
 
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: false,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    this.setState({ screenType: 'cover' });
  };
  onSeeking = currentTime => this.setState({ currentTime });
  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{ uri: 'https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4' }}
          style={styles.mediaPlayer}
          volume={10}
        />
      </View>
    );
  }
}

function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Splash} />
      <Route path="/VideoPlayer" component={VideoPlayer} />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default App;