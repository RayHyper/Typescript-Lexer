// parse string into acutal text
//ex let x = 45 + 1;


export enum TokenType{
    Number,
    Identifier,
    Equals,
    OpenParen, 
    ClosePare,
    BinaryOperator,
    Let,
}

const KEYWORDS: Record<string, TokenType> ={
    "let": TokenType.Let,
}



export interface Token{
    value: string,
    type: TokenType,

}


function token(value = "", type: TokenType): Token{
     return {value, type};
}

//check if string is alphabetic in nature
function isalpha(src: string){
   return src.toUpperCase() != src.toLowerCase();
}

function isskippable(str:string){
    return str == ' ' || str == '\n' || str == '\t'; //|| str == '\r'  add this so it can read each +2 line rather than just 1
}

function isint(str: string){
    //returns the unicode value of the character at  0
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}



export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    //get every character
    const src = sourceCode.split("");

    //build each token until end of file
    while (src.length > 0){

        if(src[0] == '('){
            tokens.push(token(src.shift(), TokenType.OpenParen))
        }
        
        else if(src[0] == ')'){
            tokens.push(token(src.shift(), TokenType.ClosePare))
        }

        
        else if(src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/'){
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
        }

        else if(src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals))
        }

        //handle multi character tokens
        else{
            
            //build number token
            if(isint(src[0])){
                  let num = "";
                  while(src.length > 0 && isint(src[0])){
                    num += src.shift();
                  }

                  tokens.push(token(num, TokenType.Number))
            }
            //build alpha token
            else if(isalpha(src[0])){
                let ident = "";
                while(src.length > 0 && isalpha(src[0])){
                    ident += src.shift();
                }

                //check for reserved keywords 

                const reserved = KEYWORDS[ident];

                if(reserved == undefined){
                    //user defined ex variable myName or sum
                    tokens.push(token(ident, TokenType.Identifier));
                }
                else{
                    //for reserved keywords ex let const
                    tokens.push(token(ident, reserved));
                }
                
            }
            //if skippable like \n or \t or spaces
            else if(isskippable(src[0])){
                src.shift();
            }
            
            else{
                console.log("Unreconized character found in source: ", src[0]);
                Deno.exit(1);
              
            }

        }
        
      
    }

    return tokens;
}

const source = await Deno.readTextFile("./test.txt");
for (const token of tokenize(source)){
    console.log(token);
}