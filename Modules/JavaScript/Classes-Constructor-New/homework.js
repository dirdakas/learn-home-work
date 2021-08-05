console.log(`
  Task.

    Create a Vector object that supports:
     1. add (same length)
     2. subtract
     3. dot
     4. norm
     5. If you try to add, subtract, or dot two vectors with different lengths, you must throw an error.
     6. toString
     7. equals
`);

class Vector {
  list = [];

  constructor(list) {
    this.list = list;
  }

  add(vector) {
    this.checkIfVectorsLengthsMatch(vector);
    
    return new Vector(this.list.map((val, index) => val + vector.list[index]));
  }
  
  subtract(vector) {
    this.checkIfVectorsLengthsMatch(vector);
    
    return new Vector(this.list.map((val, index) => val - vector.list[index]));
  }
  
  dot(vector) {
    this.checkIfVectorsLengthsMatch(vector);
    
    return this.list.reduce((sum, val, index) => {
      console.log('  ----- val=', val, 'vector.list[index]=', vector.list[index], 'addThis=', (val * vector.list[index]))
      return sum + (val * vector.list[index]);
    }, 0)
  }
  
  norm() {
    const sum = this.list.reduce((a, b) => {
      console.log('  ----- val^2=', Math.pow(b, 2));
      return a + Math.pow(b, 2);
    }, 0);
    return Math.sqrt(sum);
  }

  toString() {
    return `(${this.list.toString()})`;
  }

  equals(vector) {
    if (this.isLengthEqual(vector)) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i] !== vector.list[i]) return false;
      }
  
      return true;
    }

    return false;
  }

  isLengthEqual(vector) {
    if (this.list.length === vector.list.length) {
      return true;
    }

    return false;
  }

  checkIfVectorsLengthsMatch(vector) {
    if (!this.isLengthEqual(vector)) {
      throw 'Vectors seems to be different in size';
    }
  }
}

const a = new Vector([1, 2, 3]);
const b = new Vector([3, 4, 5]);
const c = new Vector([5, 6, 7, 8]);
const d = new Vector([1, 2, 3, 4]);

console.log(a.add(b), 'should return new Vector([4, 6, 8])');
console.log(a.subtract(b), 'should return new Vector([-2, -2, -2])');
console.log(a.dot(b), 'should return 1*3 + 2*4 + 3*5 = 26');
console.log(a.norm(), 'should return sqrt(1^2 + 2^2 + 3^2) = sqrt(14)');
console.log(a.toString(), 'should return (1,2,3)', a.toString() === '(1,2,3)')
console.log(a.equals(a), 'a.equals(a) should return true, since it\'s the same Vector and all values are the same')
console.log(a.equals(b), 'a.equals(b) should return false, since values differs')
console.log(a.equals(d), 'a.equals(d) should return false, since d vector has more values in it')

console.log(a.add(d), 'should throw an error');