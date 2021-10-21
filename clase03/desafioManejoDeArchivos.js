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

  async deleteAll() {
    await writeFileAsync(this.pr, [])
  }
}

let c = new Contenedor();

c.save({ 
  title: "Lápiz",
  price: 123.45,
  thumbnail: "https://cdn3.iconfinder.com/data...",
});