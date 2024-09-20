import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
//Login logout  user (Auth)
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const signUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        console.log('Account Created successfully !', userCredentials.user);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use')
          console.log('Already Registered ');
        if (error.code === 'auth/invalid-email')
          console.log('Wrong Email format!');
        console.log(error);
      });
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        console.log('User Logged in', userCredentials.user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        console.log('Sign out !');
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email and Password Auth</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {!user ? (
        <>
          <Button title="Sign UP" onPress={signUp} />
          <Button title="Sign IN" onPress={signIn} />
        </>
      ) : (
        <Button title="Sign Out" onPress={signOut} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});
