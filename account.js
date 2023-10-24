//Add user to firestore
const addAccount = async (account, name) => {
    const userRef = await setDoc(doc(db, 'accounts', accountName), account);
    console.log('Sent');
}

//create user object to store user data
const createNewAccount = (accountName, accountNumber, description, normalSide, accountCategory,accountSubcategory,ns ,ib ,ao, c) => {
  var account = [];


  account.push({
    accountName: accountName, 
    accountNumber: accountNumber,
    description: description,
    accountCategory: accountCategory,
    accountSubcategory:  accountSubcategory,
    normalSide: ns,
    initialBalance: ib,
    accountOrder: ao,
    comment: c,
      owner: auth.getAuth,
  });
  console.log('Sent via CreateUser');
  return user;
};

/**
 * @param {account[]} accountArr 
 * @returns {Promise[]} list of promises 
 */
const addAccounts = async (accountArr) => {
  let promises = [];
  for(var i =  0; i < accountArr.length; i++){
    let accountName = accountArr[i].accountName;
    console.log(accountName);
    let promise = addAccount(AccountArr[i], accountName);
    if(!promise) {
      console.debug('couldn\'t add the account');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  await Promise.all(promises);
  console.log("You did it");
};

function createNewAccountButton(){
  const accountName = document.getElementById("accountName").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const description = document.getElementById("description").value;
  const ns = document.getElementById("normalSide").value;
  const accountCategory = document.getElementById("accountCategory").value;
  const accountSubcategory = document.getElementById("accountSubcategory").value;
  const ib = document.getElementById("initialBalance").value;
  const ao = document.getElementById("accountOrder").value;
  const c = document.getElementById("comment").value;
  
  if(validate_email(email) || validate_password(password)){
    addAccounts(createNewAccount(accountName, accountNumber, description, normalSide, accountCategory,accountSubcategory, ns, ib, ao, c));
  }

}
const form2 = document.getElementById("form-createAccount");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  try{
    console.log('tesing something');
    createNewAccountButton();
  }catch (error){
    console.error(error);
  }
  redirect("")
});