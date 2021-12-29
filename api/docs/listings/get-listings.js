module.exports = {
    get:{
        tags: ["Listings CRUD operations"],
        description: "Get Listings",
        operationId: "getListings",
        parameters: [],
        responses: {
            "200": {
                description: "Listings were obtained",
                content: {
                    "application/json" : {
                        schema: {
                            $ref: "#/components/schemas/Listings"
                        }
                    }
                }
            }
        }
    }
}