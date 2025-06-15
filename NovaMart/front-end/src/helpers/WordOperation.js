export default function WordOperation(word , cut){
    cut = cut || 20
    if(word.length > cut){
        return word.slice(0 , cut) + "..."
    }
    else{
        return word
    }
}