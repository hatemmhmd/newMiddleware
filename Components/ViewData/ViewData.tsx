import axios from 'axios';

const sendDataToAPI = async (systemID: number, startDate: string | null, endDate: string | null, editingMode: string) => {
  try {
    await axios.post(
      `https://localhost:44382/api/Adminstration/insertpir`,
      { systemID, startDate, endDate },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.log('Error:', error);
  }
};
 
