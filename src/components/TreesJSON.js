class Tree {
    constructor(treeName, treeSpecies, country, co2Emitions, price, imageLink) {

        this.treeName = treeName;
        this.treeSpecies = treeSpecies;
        this.country = country;
        this.co2Emitions = co2Emitions;
        this.price = price;
        this.imageLink = imageLink

    }
}


let tree01 = new Tree('AusTree1', 'AusTree tree', 'Australia', 20, 100, 'https://www.bandrtreeservices.com.au/wp-content/uploads/2020/01/Historic_Trees_1.jpg')
let tree02 = new Tree('BraTree1', 'BraTree tree', 'Brasil', 15, 80, 'https://3.bp.blogspot.com/-BUAP87YGdiA/VreJo0qXbxI/AAAAAAAABCs/lDl4VucfuF0/s1600/pau%2Bbrasil.JPG')
let tree03 = new Tree('SpaTree1', 'SpaTree tree', 'Spain', 40, 40, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/bd/a3/43.jpg')
let tree04 = new Tree('CanTree1', 'CanTree tree', 'Canada', 35, 150, 'https://static.dw.com/image/16528455_403.jpg')
let tree05 = new Tree('NigTree1', 'NigTree tree', 'Nigeria', 80, 180, 'https://www.britishempire.co.uk/images2/cassiatree.jpg')
let tree06 = new Tree('AusTree2', 'AusTree tree', 'Australia', 20, 100, 'https://www.bandrtreeservices.com.au/wp-content/uploads/2020/01/Historic_Trees_1.jpg')
let tree07 = new Tree('BraTree2', 'BraTree tree', 'Brasil', 15, 80, 'https://3.bp.blogspot.com/-BUAP87YGdiA/VreJo0qXbxI/AAAAAAAABCs/lDl4VucfuF0/s1600/pau%2Bbrasil.JPG')
let tree08 = new Tree('SpaTree2', 'SpaTree tree', 'Spain', 40, 40, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/bd/a3/43.jpg')
let tree09 = new Tree('CanTree2', 'CanTree tree', 'Canada', 35, 150, 'https://static.dw.com/image/16528455_403.jpg')
let tree10 = new Tree('NigTree2', 'NigTree tree', 'Nigeria', 80, 180, 'https://www.britishempire.co.uk/images2/cassiatree.jpg')



console.log(tree01)

let trees = [tree01, tree02, tree03, tree04, tree05, tree06, tree07, tree08, tree09, tree10]

console.log(trees)

let treesJSON = JSON.stringify(trees)
console.log(treesJSON)

export default treesJSON