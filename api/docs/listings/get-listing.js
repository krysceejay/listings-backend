module.exports = {
    get: {
        tags: ["Listings CRUD operations"],
        description: "Get a listing",
        operationId: "getListing",
        parameters: [
            {
                name: "id",
                in: "path",
                schema: {
                    $ref: "#/components/schemas/listId"
                },
                required: true,
                description: "A single listing id"
            }
        ],
        responses:{
            "200": {
                description: "Listing is obtained successfully",
                content: {
                    "application/json": {
                        schema: {
                            $ref:"#/components/schemas/Listings"
                        }
                    }
                }
            },
            "404": {
                description: "Listing is not found",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Error",
                            example: {
                                message: "We can't find this listing",
                                internal_code: "Invalid id"
                            }
                        }
                    }
                }
            }
        }
    }
}