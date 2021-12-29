module.exports = {
    components: {
        schemas: {
            listId: {
                type: "string",
                description: "An id of a listing",
                example: "dvbxcartyVgf"
            },
            Listings: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        required: true,
                        description: "Listing id",
                        example: "dvbxcartyVgf"
                    },
                    title: {
                        type: "string",
                        description: "Listing's title",
                        example: "Flat"
                    },
                    completed: {
                        type: "boolean",
                        description: "The status of the listing",
                        example: false
                    }
                }
            },
            ListingsInput:{
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "Listing's title",
                        example: "Flat"
                    },
                    completed: {
                        type: "boolean",
                        description: "The status of the listing",
                        example: false
                    }
                }
            },
            Error:{
                type: "object",
                properties: {
                    message: {
                        type: "string"
                    },
                    internal_code:{
                        type: "string"
                    }
                }
            }
        }
    }
}