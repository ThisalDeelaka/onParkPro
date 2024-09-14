import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export async function verifyUserAuth(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Can't find user" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in verifyUserAuth middleware:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}


export async function generateOTP(req,res){
  req.app.locals.OTP= await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  res.status(201).send({ code: req.app.locals.OTP })
}

export async function verifyOTP(req,res){
  const { code } = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify Successsfully!'})
  }
  return res.status(400).send({ error: "Invalid OTP"});
}

export async function createResetSession(req,res){
  if(req.app.locals.resetSession){
       return res.status(201).send({ flag : req.app.locals.resetSession})
  }
  return res.status(440).send({error : "Session expired!"})
}

export async function resetPassword(req,res){
  try {
      
      if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});

      const { username, password } = req.body;

      try {
          
          UserModel.findOne({ username})
              .then(user => {
                  bcrypt.hash(password, 10)
                      .then(hashedPassword => {
                          UserModel.updateOne({ username : user.username },
                          { password: hashedPassword}, function(err, data){
                              if(err) throw err;
                              req.app.locals.resetSession = false; // reset session
                              return res.status(201).send({ msg : "Record Updated...!"})
                          });
                      })
                      .catch( e => {
                          return res.status(500).send({
                              error : "Enable to hashed password"
                          })
                      })
              })
              .catch(error => {
                  return res.status(404).send({ error : "Username not Found"});
              })

      } catch (error) {
          return res.status(500).send({ error })
      }

  } catch (error) {
      return res.status(401).send({ error })
  }
}