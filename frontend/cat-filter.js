export default function filterCats(cats, attributes){
    return Object.keys(attributes)
        .map(attributeToFilterFunction(attributes))
        .reduce(applyFilter, cats)
}

function applyFilter(items, filterFunction){
    return items.filter(filterFunction)
}

function attributeToFilterFunction(attributes){
    return attribute => enough(attribute)(attributes[attribute])
}

function enough(attribute){
    return level => cat => cat[attribute] >= +level
}
