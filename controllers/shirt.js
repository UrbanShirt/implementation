// GET '/shirt'
const getAllShirt = (req, res, next) => {
    res.json({message: "GET all shirts"}); // test function, not definitive
}

//POST '/shirt'
const newShirt = (req, res, next) => {
    res.json({message: "POST new shirt"});
};

//GET '/shirt/:name'
const getShirt = (req, res, next) => {
    res.json({message: "GET 1 shirt"});
};

//DELETE '/shirt/:name'
const deleteShirt = (req, res, next) => {
    res.json({message: "DELETE 1 shirt"});
};

//export controller functions
module.exports = {
    getAllShirt,
    newShirt,
    getShirt,
    deleteShirt
};

