// app.post('/submit', (req, res) => {
//     const selectedDriver = req.body.driver;
//     const wankerStatusValue = req.body.wankerStatus;
//     const wankerStatus = getWankerStatusText(wankerStatusValue);
  
//     console.log('Selected Driver:', selectedDriver);
//     console.log('Wanker Status:', wankerStatus);
  
//     res.render('home', {
//       driver: null,
//       message: 'Form submitted successfully!',
//     });
//   });
  
//   function getWankerStatusText(value) {
//     const options = [
//       { value: 'yes', text: "He's a total wanker" },
//       { value: 'no', text: "Nah, he's the GOAT" },
//     ];
  
//     const option = options.find((option) => option.value === value);
//     return option ? option.text : '';
//   }