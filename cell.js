class Cell {

  constructor(i ,j){
    this.i=i;
    this.j=j;
    this.visited= false;
    this.inpath=false;
    this.traversed=false;
    this.endpos=false;
    this.highlighted=false;
    this.walls =[true,true,true,true];
    this.parent=null;

  }

  show=function(){
    let x= this.j*scl;
    let y=this.i*scl;
    noStroke();
    if (this.highlighted){
      fill(255,255,0);
    }
    else if (this.inpath){
      fill(200,30,200);

    }

    else if(this.endpos){
      fill(200,200,30);
    }
    else if(this.traversed){
      fill(30,200,200);

    }
    else if(this.visited){
     fill(50,100,50);
   }
   


   rect(x,y,scl,scl);

   stroke(2);

   noFill();

   if(this.walls[0])//top
     line(x,y,x+scl,y);
   if(this.walls[1])//right
     line(x+scl,y,x+scl,y+scl);
   if(this.walls[2])//bottom
     line(x,y+scl,x+scl,y+scl);
   if(this.walls[3])//left
     line(x,y,x,y+scl);

 }

 checkNeighbors=function(){
  let neighbors=[];
  let k=0;
  let p;
  if(this.j>0 ){

    p=this.i*cols+(this.j-1);
    let top= cells[p];
    if(!top.visited)neighbors[k++]=top;
  }
  if(this.i<cols-1){
    p=(this.i+1)*cols+this.j;
    let right = cells[p];
    if(!right.visited)neighbors[k++]=right;
  }
  if(this.j<rows-1){
   p =this.i*cols+(this.j+1);
   let bottom =cells[p];
   if(!bottom.visited)neighbors[k++]=bottom;
 }
 if(this.i>0){
   p=(this.i-1)*cols+this.j;  
   let left = cells[p];
   if(!left.visited)neighbors[k++]=left;
 }
 if(k>=0){
  let r = floor(random(0,k));
     // print(r);
     return neighbors[r];

   }
   else {
    return null ;
  }

}



ScheckNeighbors=function(){
  let neighbors=[];
  let k=0;
  let p;
  if(this.j>0 ){

    p=this.i*cols+(this.j-1);
    let top= cells[p];
    if(!top.traversed && !top.walls[1])neighbors[k++]=top;
  }
  if(this.j<cols-1){
    p=(this.i)*cols+this.j+1;
    let right = cells[p];
    if(!right.traversed && !right.walls[3])neighbors[k++]=right;
  }
  if(this.i<rows-1){
   p =(this.i+1)*cols+(this.j);
   let bottom =cells[p];
   if(!bottom.traversed && !bottom.walls[0])neighbors[k++]=bottom;
 }
 if(this.i>0){
   p=(this.i-1)*cols+this.j;  
   let left = cells[p];
   if(!left.traversed && !left.walls[2])neighbors[k++]=left;
 }
 if(k>=0){
  let r = floor(random(0,k));
     // print(r);
     return neighbors[r];

   }
   else {
    return null ;
  }

}
}