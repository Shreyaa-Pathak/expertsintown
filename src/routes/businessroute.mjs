import express from 'express';
import mongoose from 'mongoose';
import { Profile } from "../models/businessProfile.mjs";
import { Business } from "../models/business.mjs";



const app = express();

mongoose.connect('mongodb://localhost:27017/expertintown')
.then(() => console.log("Connected to database"))
.catch((err) => console.log("Error"));

const port = 3000;
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});


//Business profile

app.get('/businessprofile', async(req, res) => {
    try{
        const profile = await Profile.find();
        res.send(profile);
    } catch (err){
        res.status(500);
    } 
});

app.get('/businessprofile/:id',async(req, res) => {
    const {id} = req.params;
    try{
        const profile = await Profile.findById(id);
    if (!profile) return res.status(404).send('Profile not found');
    res.send(profile);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.post('/businessprofile',async(req, res) => {
        const { body } = req;
        const newProfile = new Profile({
            business_name : body.business_name,
            service_category: body.service_category,
            state: body.state,
            city : body.city,
            email_address: body.email_address,
            phone_number: body.phone_number,
        });
        try{
            const profile = await newProfile.save();
        return res.status(201).send(profile);
        } catch (err){
            console.log(err);
            return res.sendStatus(400);
        }
});

app.put('/businessprofile/:id', async (req, res) => {
        const {body } = req;
        const {id} = req.params;
        
        try {
            console.log(body);
            const profile= await Profile.findByIdAndUpdate(id, body, { new: true });
            if (!profile) return res.status(404).send('Profile not found');
            res.send(profile);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

app.delete('/businessprofile/:id',async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) return res.status(404).send('Profile not found');
        res.send("Deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});



// about business 

app.get('/business', async(req, res) => {
    try{
        const aboutbusiness = await Business.find();
        res.send(aboutbusiness);
    } catch (err){
        res.status(500);
    } 
});

app.get('/business/:id',async(req, res) => {
    const {id} = req.params;
    try{
        const aboutbusiness = await Business.findById(id);
    if (!aboutbusiness) return res.status(404).send('About information not found');
    res.send(aboutbusiness);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});

app.post('/business',async(req, res) => {
        const { body } = req;
        const newAboutbusiness = new Business({
            overviews : body.overviews,
            services: body.services,
            contact_person: body. contact_person,
            address: body.address,
           
        });
        try{
            const aboutbusiness = await newAboutbusiness.save();
        return res.status(201).send(aboutbusiness);
        } catch (err){
            console.log(err);
            return res.sendStatus(400);
        }
});

app.put('/business/:id', async (req, res) => {
        const {body } = req;
        const {id} = req.params;
        
        try {
            console.log(body);
            const aboutbusiness= await Business.findByIdAndUpdate(id, body, { new: true });
            if (!aboutbusiness) return res.status(404).send('About information not found');
            res.send(aboutbusiness);
        } catch (err) {
            res.status(500).send(err);
        }
    }
);

app.delete('/business/:id',async (req, res) => {
    try {
        const aboutbusiness = await Business.findByIdAndDelete(req.params.id);
        if (!aboutbusiness) return res.status(404).send('About information not found');
        res.send("Deleted");
    } catch (err) {
        res.status(500).send(err);
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
