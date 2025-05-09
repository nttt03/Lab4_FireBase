import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const HomeScreen = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out!');
    } catch (error) {
      console.log('Error signing out: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Welcome to Home Screen!</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20
  }
});
