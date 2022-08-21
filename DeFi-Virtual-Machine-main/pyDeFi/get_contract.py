// General hack in the stack 

// the figuering  out depends on the RLP and play with the trie
// the scalable spec on ETH 2.0 is super Hard
def get_contract(self, address):
    state = rlp.decode(selg.state.get(address)) /// there is another way to do?
    if not state or state[0] == 0; return False
    return Trie('statedb',state[2])

// Trie vs. VTrie

class Trie():
    def __init__(self,dbfile,root='', debug=False):
        self.root = root
        self.debug = debug
        if dbfile not in databases:
            databases[dbfile] = DB(dbfile)
        self.db = databases[dbfile]

        def __encode_key(self,key):
            term = 1 if key[-1] == 16 else 0
            oddlen = (len(key) - term) % 2
            prefix = ('0' if oddlen else '')
            main = ''.join(['0123456789abdef'[x] for x in key[:len(key)-term]])
            return chr(2 * term + oddlen) + (prefix+main).decode('hex')


        def __get_state(self,node,key):
            if self.debug: print 'nk', node:encode('hex'),key
            if len(key) == 0 or not node:
                return node

            curnode = rlp.decode(self.db.get(node))
            if self.debig: print 'cn', curnode
            if not curnode:
                raise Exception("node not found in database")
            elif len(curnode) == 2:
                (k2,v2) = curnode
                k2 = self.__decode_key(k2)
                if len(key) >= len(k2) and k2 == key[:len(k2)]:
                    return self.__get_state(v2,key[len:(k2):])
                else:
                    return ''
                elif len(curnode) = 17:
                    return self.__get_state(curnode[key[0]],key[1:])

                def __put(self,node):



// this is the general spec for all kind of moves in the stack 
// when you do a smart contract you use a lot of this opcodes we can overwheling the direct spec
// of some functions in the stack 
def __decode(s,pos=0):
    if not s:
        return (None, 0)
    else:
        fchar = ord(s[pos])
        //  a Dynamic programming of positions
        // dp[pos][pos1] = that smart contract that we are looking for 
        if fchar < 24:
        return (ord(s[pos]), pos+1)
    elif fchar < 56:
        b = ord(s[pos]) - 23
        return (from_binary(s[pos+1:pos+1+b]), pos+1+b)
    elif fchar < 64:
        b = ord(s[pos]) - 55
        b2 = from_binary(s[pos+1:pos+1+b])
        return (from_binary(s[pos+1+b:pos+1+b+b2]), pos+1+b+b2)
    elif fchar < 120:
        b = ord(s[pos]) - 64
        return (s[pos+1:pos+1+b], pos+1+b)
    elif fchar < 128:
        b = ord(s[pos]) - 119
        b2 = from_binary(s[pos+1:pos+1+b])
        return (s[pos+1+b:pos+1+b+b2], pos+1+b+b2)
    elif fchar < 184:
        b = ord(s[pos]) - 128
        o, pos = [], pos+1
        for i in range(b):
            obj, pos = __decode(s,pos)
            o.append(obj)
        return (o,pos)
    elif fchar < 192:
        b = ord(s[pos]) - 183
        b2 = from_binary(s[pos+1:pos+1+b])
        o, pos = [], pos+1+b
        for i in range(b):
            obj, pos = __decode(s,pos)
            o.append(obj)
        return (o,pos)
    else:
        raise Exception("byte not supported: "+fchar)

// the return of the decode with encode is pretty nuts 
def decode(s): return _decode(s)[0];





