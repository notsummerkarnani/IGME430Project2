const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login', {
  csrfToken: req.csrfToken(),
});

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// logs in the user
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: err });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// signs up the user if there are no errors
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();

    req.session.account = Account.toAPI(newAccount);

    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

// changes user password
const changePass = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass === pass2) {
    return res.status(400).json({ error: 'New password cannot be same as old password!' });
  }

  return Account.authenticate(username, pass, async (err, account) => {
    if (err || !account) {
      return res.status(400).json({ error: err });
    }
    console.log(account);
    const hash = await Account.generateHash(pass2);
    const updatedAcc = account;
    updatedAcc.password = hash;
    updatedAcc.updatedDate = Date.now();
    await updatedAcc.save();
    req.session.account = Account.toAPI(updatedAcc);
    return res.status(200).json({ redirect: '/maker' });
  });
};

const getToken = (req, res) => res.json({ csrfToken: req.csrfToken() });

module.exports = {
  loginPage,
  login,
  logout,
  signup,
  getToken,
  changePass,
};
