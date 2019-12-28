let rows;
let cols;
const scl = 20;
let cells = [];
let current;
let stack=[];
let Sstack=[];
let count=0;
let end;
let solve=false;
function setup() {

  createCanvas(800, 800);
  rows = height / scl;
  cols = width / scl;
  background(0);
  frameRate(60);
   //cell = new Cell(1,1);
   for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var c=new Cell(i,j);
     // console.log(c.i);
     cells.push(c);

   }
 }
 current=cells[0];
 
 generate();
 
}
function draw() {
  background(0,0,255);
  if(solve){
    current.traversed=true;
    
    let next=current.ScheckNeighbors();
    if(next!=null){

      next.traversed=true;
      Sstack.push(current);
      next.parent=current;
      current=next;
    }
    else if(Sstack.length>0){
      current=Sstack.pop();
    }
  }
  for(c in cells){
    cells[c].show(); 
  }
  let t=current;
  if(solve && t==end){
    solve=false;
    while(t!=cells[0]){
      t.inpath=true;
      t=t.parent;
    }
  }


}
function mousePressed(){
  let j=floor(mouseX/scl);
  let i=floor(mouseY/scl);

  
  if(end==null){
    end=cells[i*cols+j];
    end.endpos=true;
    current=cells[0];
    solve=true;
  }
  
}
function generate(){

  do{
    //console.log("generating");
    current.visited=true;
    
    //current.highlight();
    let next=current.checkNeighbors();
    if(next!=null){
      next.visited=true;
      count++;
      stack.push(current);
      let x=current.i-next.i;
      if (x==1) {
        current.walls[0]=false;
        next.walls[2]=false;
      } else if (x==-1) {
        next.walls[0]=false;
        current.walls[2]=false;
      } 
      let y=current.j-next.j;
      if (y==1) {
        current.walls[3]=false;
        next.walls[1]=false;
      } else if(y==-1) {
        next.walls[3]=false;
        current.walls[1]=false;
      } 

      current=next;
    }
    else if(stack.length>0 ){
      current=stack.pop();
      count++;

    }
  }while(current!=cells[0]);
}

