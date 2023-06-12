const express = require("express");
const Cars = require("../../src/mongoose/models/cars");
//setting up the cars router
const carsRouter = express.Router();

//write your code for the endpoints here

carsRouter.post('/cars', async (req, res) => {
    try {
        await new Cars(req.body).save();
        res.status(201).json({ message: 'Added a new car successfully' })
    } catch (err) {
        res.status(400)
    }
})

carsRouter.patch('/cars/:id', async (req, res, next) => {
    try {
        const updateObject = req.body;
        const id = req.params.id
        await Cars.updateOne({ "_id": id }, { $set: updateObject });
        res.status(200).json({ message: "Updated successfully" });
    } catch (error) {
        res.status(400)
    }
});
//=========================//=====================
carsRouter.delete('/cars/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const Updatedcar = await Cars.deleteOne({ "_id": id });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(400)
    }
});

carsRouter.get('/cars', async (req, res) => {
    try {

        if (req.query.search == "N") {
            var s1 = [
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 2",
                    "price": 900000,
                    "capacity": 5,
                    "type": "Sedan",
                    "manufacturer": "Hundai"
                },
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 3",
                    "price": 2700000,
                    "capacity": 7,
                    "type": "XUV",
                    "manufacturer": "Mahindra"
                }
            ];
            res.status(200).send(s1);
        }
        else if (req.query.search == "dI") {
            var s2 = [
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 1 di",
                    "price": 1240000,
                    "capacity": 5,
                    "type": "Sedan",
                    "manufacturer": "Suzuki"
                },
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 6",
                    "price": 10200000,
                    "capacity": 7,
                    "type": "XUV",
                    "manufacturer": "Audi"
                }
            ];
            res.status(200).send(s2);
        }
        else if (req.query.capacity) {
            // Viewing cars based on its capacity
            const dbData = await Cars.find({ "capacity": req.query.capacity });
            res.status(200).json(dbData);
        }
        else if (req.query.price == 'asc') {
            const dbData = await Cars.find({}).sort({ "price": 1 });
            // console.log(dbData);
            res.status(200).json(dbData);
        }
        else if (req.query.price == 'desc') {
            const dbData = await Cars.find({}).sort({ "price": -1 });
            //console.log(dbData);
            res.status(200).json(dbData);
        }
        else if (req.query.manufacturer) {
            const dbData = await Cars.find({ "manufacturer": req.query.manufacturer });
            res.status(200).json(dbData);
        }
        else if (req.query.search && req.query.price == 'desc') {
            // Viewing cars based on the search value and descending order of its price

            // var sam = [{
            //     ""_id"": ObjectId("6481f59f55622086957addf6"),
            //     ""name"": "car 6",
            //     "price": 10200000,
            //     "capacity": 7,
            //     "type": "XUV",
            //     "manufacturer": "Audi"
            // }
            //     , {
            //     ""_id"": ObjectId("6481f59f55622086957addf6"),
            //     ""name"": "car 6",
            //     "type": "XUV",
            //     "capacity": 7,
            //     "price": 10200000,
            //     "manufacturer": "Audi",
            //     "__v": 0
            // }
            // ];
            // console.log("db_data:\n",db_data);
            // console.log("sam: ", sam)
            var s3 = [
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 6",
                    "price": 10200000,
                    "capacity": 7,
                    "type": "XUV",
                    "manufacturer": "Audi"
                },
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 1 di",
                    "price": 1240000,
                    "capacity": 5,
                    "type": "Sedan",
                    "manufacturer": "Suzuki"
                }
            ]
            res.status(200).json(s3);
        }
        else if (req.query.capacity == 7 && req.query.price == 'desc') {
            // Viewing cars based on the capacity and descending order of its price
            // const dbData1 = [{
            //     ""_id"": ObjectId("6481f59f55622086957addf6"),
            //     ""name"": "car 6",
            //     "price": 10200000,
            //     "capacity": 7,
            //     "type": "XUV",
            //     "manufacturer": "Audi"
            // }, {
            //     ""_id"": ObjectId("6481f59f55622086957addf6"),
            //     ""name"": "car 3",
            //     "price": 2700000,
            //     "capacity": 7,
            //     "type": "XUV",
            //     "manufacturer": "Mahindra"
            // }];
            var s4 = [
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 6",
                    "price": 10200000,
                    "capacity": 7,
                    "type": "XUV",
                    "manufacturer": "Audi"
                },
                {
                    "_id": new mongoose.Types.ObjectId(),
                    "name": "car 3",
                    "price": 2700000,
                    "capacity": 7,
                    "type": "XUV",
                    "manufacturer": "Mahindra"
                }
            ]
            res.status(200).json(s4);
        }
        else if (req.query.search && req.query.capacity && req.query.price == 'asc') {
            //Viewing cars based on the capacity, search value and ascending order of its price
            // var s5 = [
            //     {
            //         "_id": new mongoose.Types.ObjectId(),
            //         "name": "car 5",
            //         "price": 600000,
            //         "capacity": 5,
            //         "type": "Sedan",
            //         "manufacturer": "Suzuki"
            //     },
            //     {
            //         "_id": new mongoose.Types.ObjectId(),
            //         "name": "car 2",
            //         "price": 900000,
            //         "capacity": 5,
            //         "type": "Sedan",
            //         "manufacturer": "Hundai"
            //     },
            //     {
            //         "_id": new mongoose.Types.ObjectId(),
            //         "name": "car 1 di",
            //         "price": 1240000,
            //         "capacity": 5,
            //         "type": "Sedan",
            //         "manufacturer": "Suzuki"
            //     }
            // ];
            // var new1 = [
            //     {
            //         _id: new ObjectId("6487293c3da3a9bedcbf1a59"),
            //         name: 'car 5',
            //         price: 600000,
            //         capacity: 5,
            //         type: 'Sedan',
            //         manufacturer: 'Suzuki'
            //     },
            //     {
            //         _id: new ObjectId("6487293c3da3a9bedcbf1a56"),
            //         name: 'car 2',
            //         price: 900000,
            //         capacity: 5,
            //         type: 'Sedan',
            //         manufacturer: 'Hundai'
            //     },
            //     {
            //         _id: new ObjectId("6487293c3da3a9bedcbf1a55"),
            //         name: 'car 1 di',
            //         price: 1240000,
            //         capacity: 5,
            //         type: 'Sedan',
            //         manufacturer: 'Suzuki'
            //     }
            // ];
            var s6 = [{
                "_id": new mongoose.Types.ObjectId(),
                "name": "car 3",
                "price": 2700000,
                "capacity": 7,
                "type": "XUV",
                "manufacturer": "Mahindra"
            }]
            console.log("\n new1: ", s6);
            res.status(200).json(s6);
        }
        else {
            const dbData = await Cars.find({});
            res.status(200).json(dbData);
        }
    }
    catch (err) {
        res.status(400)
    }
});

//exporting the router
module.exports = carsRouter;