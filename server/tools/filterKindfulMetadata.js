module.exports = {
    filterKindfulMetadata(data) {
        let newArray = []
        if (data !== null) {
            if (Array.isArray(data)) {
                data.map((item) => {
                    newArray.push({
                        id: item.id,
                        name: item.name,
                        description: item.description
                    })
                })
            } else if (data.constructor.name == 'Object') {
                return data
            }
        }

        return newArray
    }
}
