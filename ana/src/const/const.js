module.exports = {
    MONGO_SCHEMA: {
        _id: Number,
        title: String,
        address_main: String,
        address_detail: String,
        area: Number,
        floor: String,
        household: String,
        rent_type: String,
        distance: String,
        tag: [String],
        style: String,
        price: Number
    },
    CRITERIA: {
        "tag":"独立卫生间",
        title:/天通西苑/,
        rent_type: "合",
        // "distance": /苏州街/
    }
};