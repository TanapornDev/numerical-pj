const bisecCtrl = {};
const bisec = require('../models/bisec');



bisecCtrl.getVarias = async (req, res) => {
    const bis = await bisec.find();
    res.json(bis);
};

//-----------------------------รับค่า------------------------------------
bisecCtrl.createVaria = async (req, res) => {
    const { XL,XR } = req.body;
    const newVaria = new bisec({
        XL,
        XR
    });
    await newVaria.save();
    res.json('new varia added');
};





//-----------------------------อ่าน--------------------------------------

bisecCtrl.getVaria = async (req, res) => {
    const Varia = await bisec.findById(req.params.id);
    res.json(Varia);
}
//------------------------------ลบ--------------------------------------

bisecCtrl.deleteVaria = async (req, res) => {
    await bisec.findByIdAndDelete(req.params.id);
    res.json('Varia Deleted');
}
//----------------------------อัพเดท-------------------------------------
bisecCtrl.updateVaria = async (req, res) => {
    const { XL,XR } = req.body;
    await bisec.findByIdAndUpdate(req.params.id, {
        XL,
        XR
    });
    res.json('Varia Updated');
}
module.exports = bisecCtrl;