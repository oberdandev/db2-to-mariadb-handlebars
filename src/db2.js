const ibmdb = require('ibm_db');
const mariadb = require('mariadb');

const query = {
  getTablesName: (schema) =>  `SELECT TABNAME FROM SYSCAT.TABLES WHERE TABSCHEMA = upper('${schema}')`,
  getColumns: (schema) => `SELECT COLNAME, TYPENAME, LENGTH, COLNO,  "SCALE", "DEFAULT", "NULLS" FROM SYSCAT.COLUMNS WHERE TABSCHEMA = upper('${schema}')`,

  getColumnsPrimaryKey: (schema, table) => `SELECT COLNAME FROM SYSCAT.COLUMNS WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}') AND KEYSEQ = 1`,
  getColumnsForeignKey: (schema, table) => `SELECT COLNAME, TABNAME, CONSTNAME FROM SYSCAT.REFERENCES WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}')`,
  
  getColumnsCheck: (schema, table) => `SELECT COLNAME, TEXT FROM SYSCAT.CHECKS WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}')`,
  
  getColumnsUnique: (schema, table) => `SELECT COLNAME FROM SYSCAT.INDEXES WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}') AND UNIQUERULE = 'U'`,
  
  getColumnsIndex: (schema, table) => `SELECT COLNAMES FROM SYSCAT.INDEXES WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}')`,
  
  getColumnsView: (schema, table) => `SELECT TEXT FROM SYSCAT.VIEWS WHERE TABSCHEMA = upper('${schema}') AND TABNAME = upper('${table}')`,
  getColumnsProcedure: (schema, table) => `SELECT TEXT FROM SYSCAT.PROCEDURES WHERE PROCSCHEMA = upper('${schema}') AND PROCNAME = upper('${table}')`,
  getColumnsFunction: (schema, table) => `SELECT TEXT FROM SYSCAT.FUNCTIONS WHERE FUNCSCHEMA = upper('${schema}') AND FUNCNAME = upper('${table}')`,
  getColumnsTrigger: (schema, table) => `SELECT TEXT FROM SYSCAT.TRIGGERS WHERE TRIGSCHEMA = upper('${schema}') AND TRIGNAME = upper('${table}')`,

}
const connectionString = "DATABASE=db2;HOSTNAME=138.197.98.40;PORT=50000;PROTOCOL=TCPIP;UID=DB2INST1;PWD=root;";

async function tryConnectionToDb2(database, host, port, user, password, schema) {
    const cn = `DATABASE=${database};HOSTNAME=${host};PORT=${port};PROTOCOL=TCPIP;UID=${user};PWD=${password};`;

    try{
      let conn = await ibmdb.open(cn);
      await conn.query(`SELECT TABNAME FROM SYSCAT.TABLES WHERE TABSCHEMA = upper('${schema}')`).then(t => console.log(t)).catch((e) => {console.log(e);});
     
    }catch(e) {
       console.log(e)
    }

}

tryConnectionToDb2('db2', '138.197.98.40', 50000, 'DB2INST1', 'root', 'DB2INST1');



const pool = mariadb.createPool({
     host: 'mydb.com', 
     user:'myUser', 
     password: 'myPassword',
     connectionLimit: 5
});