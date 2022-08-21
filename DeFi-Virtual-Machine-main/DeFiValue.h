

using namespace std;

//TODO: Looking for the one move all in for the stack 
namespace DeFiVm {
    class ContextCompiler;
    class Instruction;

    class DeFiValue
    {
        // stack stuff 
        protected:
            explicit DeFiValue() {};

        public:

            virtual void StackSize() {return };

            virtual void Instruction() {return const& };

            virtual void StackOneMove() { return };


    }

        // stack size
}
