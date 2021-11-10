const fs = require("fs");

const writeFileAsync = async (arr) => {
  await fs.promises.writeFile(
    './productos.txt',
    JSON.stringify(arr, null, 2),
    'utf-8'
  );
};

const readFileAsync = async () => {
  let file = await fs.promises.readFile('./productos.txt', 'utf-8');
  return file;
};

class Contenedor {
  constructor() {
    this.pr = [];
  }

  async save(product) {
    let fileExits = await readFileAsync();
    if (fileExits && fileExits.length >= 0) {
      console.log(fileExist);
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile.length + 1;
      dataFile.push(product);
      this.pr = dataFile;
      writeFileAsync(this.pr);
    } else {
      product.id = 1;
      this.pr.push(product);
      writeFileAsync(this.pr);
    }
  }

  async getAll(){
      console.log(await readFileAsync());
  }

  async getById(id) {
    let fileExits = await readFileAsync();
    let dataFile = JSON.parse(fileExits).filter((product) => product.id === id);
      if (dataFile.length >= 1) {
          console.log(dataFile[0]);
      }else{
          console.log('No hay productos que coincidan con el Id');
      }
  }

  async deleteById(id) {
    let fileExits = await readFileAsync();
    let dataFile = JSON.parse(fileExits).filter((product) => product.id === id);
      if (dataFile.length >= 1) {
          fileExits.splice(dataFile, 1);
          this.pr = fileExits;
          writeFileAsync(this.pr);
          return `Producto ${id} eliminado`;
      }else{
          console.log('No hay productos que coincidan con el Id');
      }
  }

  async updateById(id, arr) {
    let fileExits = await readFileAsync();
    if (fileExits && fileExits.length >= 0) {
      let fileData = JSON.parse(fileExits);
      let i;
      fileData.find((product, index) => {
        if (product.id == id) {
          i = index;
          return i;
        }
      });
      fileData[i].title = arr.title;
      fileData[i].price = arr.price;
      fileData[i].thumbnail = arr.thumbnail;
      writeProductFile(fileData);
    }
  } 
}

let c = new Contenedor();

c.save({ 
  title: "Lagarde",
  price: 1100,
  thumbnail: "https://www.espaciovino.com.ar/media/default/0001/54/thumb_53915_default_small.jpeg",
});

module.exports = Contenedor;