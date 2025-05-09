import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { auth } from '../config/firebase';
import { View, TextInput, Button, FormErrorMessage, Logo } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { signupValidationSchema } from '../utils';

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    confirmPasswordIcon,
    confirmPasswordVisibility,
    handleConfirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password } = values;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} />
          <Text style={styles.screenTitle}>Create a new account!</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}
        >
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <>
              <TextInput
                name="email"
                leftIconName="email"
                placeholder="Enter email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput
                name="password"
                leftIconName="key-variant"
                placeholder="Enter password"
                secureTextEntry={passwordVisibility}
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              <TextInput
                name="confirmPassword"
                leftIconName="key-variant"
                placeholder="Confirm password"
                secureTextEntry={confirmPasswordVisibility}
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
              />
              <FormErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />
              {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </Button>
              <Button
                style={styles.borderlessButtonContainer}
                borderless
                title="Already have an account?"
                onPress={() => navigation.navigate('Login')}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 12 },
  logoContainer: { alignItems: 'center' },
  screenTitle: { fontSize: 32, fontWeight: '700', color: Colors.black, paddingTop: 20 },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { fontSize: 20, color: Colors.white, fontWeight: '700' },
  borderlessButtonContainer: { marginTop: 16, alignItems: 'center', justifyContent: 'center' },
});
