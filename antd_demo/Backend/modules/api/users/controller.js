const userModel = require("./model");

const createUser = ({ username, email, password, fullName }) =>
  new Promise((resolve, reject) => {
    userModel
      .create({ username, email, password, fullName })
      .then(user => resolve(user._id))
      .catch(err => reject(err));
  });

  const getUsers = () =>
  new Promise((resolve, reject) => {
    userModel
      .find({
        active: true
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });



const getAllUsers = (page,limit,direction,filter) =>
  new Promise((resolve, reject) => {
	  limit = parseInt(limit);
		userModel
		.find({
		  active: true,
		  'username': {'$regex': filter,"$options": 'i'}
		})
		.sort(direction)
		.skip((page - 1) * limit)
		.limit(limit)
		.select("_id username fullName email")
		.exec()
		.then(data => resolve(data))
		.catch(err => reject(err));
});

const getOneUser = id =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        active: true,
        _id: id
      })
      .populate('listFriend')
      .populate('listEvent.friends.friend')
      .populate('listEvent.friends.attend')
      .exec()
      .then(data =>
        resolve(
          Object.assign({}, data._doc, { avatarUrl: `/api/users/${id}/avatar` })
        )
      )
      .catch(err => reject(err));
  });


const deleteUser = id =>
  new Promise((resolve, reject) => {
    userModel
      .update({ _id, id }, { active: false })
      .exec()
      .then(data => resolve(data._id))
      .catch(err => reject(err));
});

const getUserForAuth = username =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({ username })
      .select("username password _id")
      .then(user => resolve(user))
      .catch(err => reject(err));
  });

const updateDataBefore = (id, dataBefore) =>
  new Promise((resolve, reject) => {
    userModel
      .update(
        {
          _id: id
        },
        {
          dataBefore
        }
      )
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

  const update = (data) =>{
  new Promise((resolve, reject) => {
    userModel
      .updateOne(
        {
          _id: data._id
        },
        {
          $set: {listEvent : data.listEvent}
        }
      )
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });}

const filter = ({values, filter})=>{
		if(filter=="")	return values;
		const change = [];
		for (i = 0; i < 5; i++) {
			console.log(values[i].username.toUpperCase());
			let value = values[i].username.toUpperCase();
			if(value.indexOf(filter.toUpperCase()) > -1){
				change.push(values[i]);
			}
		}
		return change;
}



module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
  deleteUser,
  getUserForAuth,
  updateDataBefore,
  getUsers,
  filter,
  update
}
