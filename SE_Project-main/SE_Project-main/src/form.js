import React, { useState } from "react";
import "./App.css"

function App()

const [state, setState] = useState({
clientid: "";
expenseType: "";
amount:"";
subDate: "";
managerid: "";
message: "";
})

function fileUpload{

}

/*handles each of the inputs*/
const handleChange = e => { /*sort this out*/
setClientID(e.target.value)
}

const handleSub = event => {
event.preventDefault();
alert('Your expense claim has been submitted.')
}

const handleCancel = event => { /*if cancel button is pressed this should result in page being redirected*/

}

const handleReset = event => { /*clears all the form fields*/

}

const addReceipt = event => { /*new window pop-up which allows uploading the file from the computer*/

}
/*should allow for upload of multiple receipts - maximum 10*/

const removeReceipt = event => {  /*allows removal of selected receipt*/

}

/*deals with the display*/
return(
 <div className = 'App'>
 <h1>Add an expense claim</h1>
 <form onSubmit = {handleSub}>

 <label> Client ID:
 <input type="text" value={clientid} onChange={handleChange}/>
 </label>

 <label> What type of expense is it?
 <select
  name="expenseType"
  value={state.expenseType}
  onChange={handleChange}
  >
 <option value="travel"> Travel </option>
 <option value="communication"> Communication </option>
 <option value="office"> Office </option>
 </select>
 </label>

<label> Total amount
<input type="text" value="amount" onChange={handleChange}> /*change the input to a currency type if possible*/
</label>

 <label> Submission Date:
 <input type="date" value="subDate" onChange={handleChange}/>
 </label>

<label> ManagerID:
<input type="text" value="managerid" onChange={handleChange}/>
</label>

<label> Message:
<textarea
name = "message"
value = {state.message}
onChange = {handleChange}
>
</label>

<button type="file" onClick={fileUpload} >Add Receipt</button>
<button onClick={} >Remove Receipt</button>

<button onClick={} >Reset</button>
<button type="submit">Submit</button>
 </form>
 </div>
)
}