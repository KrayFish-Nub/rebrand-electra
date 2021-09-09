const { Schema, Types, model } = require("mongoose");

const guildSchema = new Schema({
    id:
    {
        type: String,
        unique: true,
        required: true
    },
    role: String,
    channelId:
    {
        type: String,
        required: true
    },
    bots: [{
        type: Types.ObjectId,
        ref: "Bot"
    }]
}, { timestamps: true });

const Guild = model("Guild", guildSchema);


module.exports = Guild;