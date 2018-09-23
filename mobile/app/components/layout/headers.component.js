import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export class HeaderLeftComponent extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => { this.props.navigation.toggleDrawer(); } }>
        <Icon name="menu" iconStyle={styles.iconBar}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  iconBar: {
    color: "#fff", marginLeft:10, fontSize: 25
  }
})
