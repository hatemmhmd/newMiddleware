  const sendDataToAPI = async (systemID: number, startDate: string | null, endDate: string | null, editingMode: string) => {
    try {
      //`${process.env.REACT_APP_BACKEND_API}api/Adminstration/insertpir${editingMode}`
      await fetch("https://localhost:44382/api/Adminstration/insertpir", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ systemID, startDate, endDate }),
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };
