const {MongoClient} = require('mongodb');
const url = "mongodb://localhost:27017";
const dbname = "souls";

const client = new MongoClient(url);

const Bankai = async ()=>{
   try{
    await client.connect();
    console.log("Connected to the Bankai Master");
   }
   catch(err){
    console.error(err);
   }
}

export const registerStudent = async (record) => {
  try {
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('student');
     const { id } = record;

     const exists = (await collection.find({id:id},{projection:{_id:false,pwd:false}}).toArray()).length > 0 ? true : false; 
     if (exists) {
         return { exists: true };
     }

     const result = await collection.insertOne(record);
     console.log('result', result);
     return { insert: result.acknowledged };
  } catch (err) {
     console.error(err);
  }
};

export const registerSensei = async (record) => {
  try {
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('sensei');
     const { id } = record;

     const exists = (await collection.find({id:id},{projection:{_id:false,pwd:false}}).toArray()).length > 0 ? true : false; 

     if (exists) {
         return { exists: true };
     }

     const result = await collection.insertOne(record);
     console.log('result', result);
     return { insert: result.acknowledged };
  } catch (err) {
     console.error(err);
  }
};

const sensei = [
  {
    name:"kirito",
    pwd:"test"
  }
]

const student = [
  {
    name:"kirito",
    pwd:"test",
    urls:[{
      sensei:"test",
      url:"test",
      subject:"test",
      date:new Date().toLocaleDateString('en-US',{
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        second:"numeric"
      })
    }]
  }
]

export const checkSensei = async (record) => {
  try{
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('sensei');
     console.log('got',record)

     const result = await collection.find(record,{projection:{_id:false,pwd:false}}).toArray();   
     
     console.log('result',result)
    
     return result;
  }
  catch(err) {
     console.error(err);
  }
  finally{
    client.close();
  }
}

export const checkStudent = async (record) => {
  try{
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('student');

     const result = await collection.find(record,{projection:{_id:false,pwd:false}}).toArray();    
     
     return result; 
  }
  catch(err) {
     console.error(err);
  }
  finally{
    client.close();
  }
}

export const UpdateStudent = async (data,id) => {
  try{
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('student');
     const result = await collection.updateOne({id:id},{$set:{data:data}});   

     return result.acknowledged;
  }
  catch(err) {
     console.error(err);
  }
  finally{
    client.close();
  }
}

export const student_look = async () => {
  try{
     await Bankai();
     const db = client.db(dbname);
     const collection = db.collection('student');

     const result = await collection.find({},{projection:{_id:false,id:false,email:false,name:false,pwd:false}}).toArray();    
     console.log("database"+result);
     return result; 
  }
  catch(err) {
     console.error(err);
  }
  finally{
    client.close();
  }
}
