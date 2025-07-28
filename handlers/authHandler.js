const User = require('../pkg/model/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async(req,res) => {
    try{
        if(!['mentor', 'startup'].includes(type)){
            return res.status(400).json({message: 'Invalid user type!'});
        };
        if(type === 'mentor') {
            if(req.body.representative || req.body.address || req.body.jobPosted){
                return res.status(400).json({message: 'Mentor can not include representative,address or jobs posted!'})
            }
        } else if(type === 'startup'){
            if(req.body.skills || req.body.phone || req.body.acceptedJobs ){
                return res.status(400).json({message:'Startup can not include skills,phone or accepted jobs!'})
            }
        };
        const newUser = await User.create({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password,
            type:req.body.type,
        });
        res.status(201).json({
            status:'success',
            data: {
                user: newUser,
            },
        });
    } catch(err){
        res.status(500).json({
            status:'fail',
            message:err.message,
        });
    }
};

exports.login = async(req,res) => {
    try{
        const{ email, password } = req.body;

        if(!email || !password){
            return res.status(400).send('Please enter email or password!')
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).send('Invalid email or password!')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password!');
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                type: user.type
            },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES}
        );
        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            secure: false,
            httpOnly: true,
        });

        res.status(201).json({
            status:'success',
            token,
        });

    } catch(err) {
        res.status(500).json({
            status:'fail',
            message: err.message,
        });
    }
};