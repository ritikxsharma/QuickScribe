const Note = require('../models/Note')

const getNote = async(req, res) => {
    try {
        const { name } = req.params
        const note = await Note.findOne({name})

        if(!note){
            return res.status(400).json({ message: 'Note does not exists' })
        }
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createNote = async(req, res) => {
    try {
        const { name } = req.params
        let note = await Note.findOne({ name })        
        if(note){
            return res.status(400).json({ message: 'Note already exists' })
        }

        note = await Note.create({name, content: ""})
        note.save()

        res.status(200).json(note)
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message: error.message})
    }
}


const updateNote = async(req, res) => {
    try {
        const { name } = req.params
        const { content } = req.body

        const note = await Note.findOneAndUpdate(
            {name},
            {content},
            { new: true, upsert: true }
        )

        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getNote,
    createNote,
    updateNote
}