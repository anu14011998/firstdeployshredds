import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

// Define an interface for the form data
interface FormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const Sign_up: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  // Update the form data state
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to handle registration
  const handleRegistration = async () => {
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('password', formData.password);

      const response = await fetch('https://shreddersbay.com/API/user_api.php?action=signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (response.ok) {
        Alert.alert('Success', 'Registration successful');
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TextInput
        placeholder="Mobile"
        value={formData.mobile}
        onChangeText={(value) => handleChange('mobile', value)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange('password', value)}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default Sign_up;
