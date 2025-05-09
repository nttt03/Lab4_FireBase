import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../config/firebase';
import { View, TextInput, Button, FormErrorMessage } from '../components';
import { Colors } from '../config';
import { passwordResetSchema } from '../utils';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handlePasswordReset = async (values) => {
    const { email } = values;
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Reset your password</Text>
      </View>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={passwordResetSchema}
        onSubmit={handlePasswordReset}
      >
        {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
          <>
            <TextInput
              name="email"
              leftIconName="email"
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
            {emailSent && (
              <Text style={styles.successMessage}>📨 Reset email sent. Check your inbox!</Text>
            )}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </Button>
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={'Go back to Login'}
              onPress={() => navigation.navigate('Login')}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20,
  },
  successMessage: {
    marginVertical: 10,
    color: 'green',
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
