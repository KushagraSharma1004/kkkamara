import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore'; // Ensure you import Firestore functions
import { db } from './firebaseConfig'; // Import your Firestore config

const MyBeat2ScoreHistory = ({ mobileNumber }) => {
  const [scoreHistory, setScoreHistory] = useState([]);
  const fullMobileNumber = '+' + mobileNumber.replace(/\s+/g, '');
  useEffect(() => {
    const fetchScoreHistory = async () => {
      if (fullMobileNumber) {
        const userDocRef = doc(db, 'users', fullMobileNumber);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          // Retrieve the score history from Firestore
          const history = docSnap.data().MyBeat2ScoreHistory || [];
          setScoreHistory(history);
        } else {
          console.error('No such document!');
        }
      }
    };

    fetchScoreHistory();
  }, [fullMobileNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Beat 2 Score History</Text>
      <FlatList
        data={[...scoreHistory].reverse()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.scoreText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '89%',
    borderRadius: 7,
    padding: 5,
    marginVertical: 10,
    maxHeight:250,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 13,
    },
  scoreItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scoreText: {
    fontSize: 16,
  },
});

export default MyBeat2ScoreHistory;
