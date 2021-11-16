instance.get(`/api/users/` ,{
    headers: {
              "Content-Type": "application/json",
              "Accept": "application/json", 
              "Authorization": "Bearer " + token,
            }
  })
  .then(res => { 
    this.users = res.data
  })
  .catch((error)=>{
    console.log(error)
  });