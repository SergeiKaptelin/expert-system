import {getRules} from "../helpers/utils";
import {calculate} from "../core/algorithm";

describe("Algorithm", () => {
  describe("when simple data", () => {
    describe("should handle AND", () => {
      describe("with single conclusion", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/and/single-conclusion.txt");
        });

        test("? + true => true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false + ? => true ", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false + false => ?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("with single condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/and/single-condition.txt");
        });

        test("? => true + true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("? => true + false", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("? => false + true", () => {
          expertSystem.facts = {
            A: null,
            B: false,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("? => false + false", () => {
          expertSystem.facts = {
            A: null,
            B: false,
            C: false,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("true => ? + true", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("true => ? + false", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false => ? + true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false => ? + false", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("true => true + ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("true => false + ?", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false => true + ?", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false => false + ?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("with both: conclusion and condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/and/both.txt");
        });

        test("? + true => false + true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("true + ? => false + false", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: false,
            D: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false + true => ? + true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false + false => false + ?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: false,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });
    });

    describe("should handle OR", () => {
      describe("with single conclusion", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/or/single-conclusion.txt");
        });

        test("? | true => true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false | ? => false", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false | false => ?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("with single condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/or/single-condition.txt");
        });

        test("? => true | false", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("true => ? | false", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("true => false | ?", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });
      });

      describe("with both: conclusion and condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/or/both.txt");
        });

        test("? | true => true | false", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
            D: false,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false | ? => false | false", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false | true => ? | true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("true | true => true | ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: true,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });
    });

    describe("should handle XOR", () => {
      describe("with single conclusion", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/xor/single-conclusion.txt");
        });

        test("? ^ true => true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false ^ ? => false", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false ^ false => ?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("with single condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/xor/single-condition.txt");
        });

        test("? => true ^ false", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("true => ? ^ false", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("true => false ^ ?", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });
      });

      describe("with both: conclusion and condition", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/xor/both.txt");
        });

        test("? ^ true => true ^ false", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: true,
            D: false,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false ^ ? => false ^ false", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false ^ true => ? ^ true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("true ^ true => true ^ ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: true,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });
    });

    describe("should handle NOT", () => {
      describe("just NOT", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/not/just-not.txt");
        });

        test("!false => ?", () => {
          expertSystem.facts = {
            A: false,
            B: null,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("!? => true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("AND and NOT", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/not/and-not.txt");
        });

        test("!? + true => false + !true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("!false + ? => false + !true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("!true + false => ? + !false", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
            D: false,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!false + true => true + !?", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: true,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });
      });

      describe("OR and NOT", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/not/or-not.txt");
        });

        test("!? | true => false | !true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!false | ? => false | !true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!true | false => ? | !false", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
            D: false,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!false | true => true | !?", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: true,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("XOR and NOT", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/not/xor-not.txt");
        });

        test("!? | true => false | !true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("!false | ? => false | !true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("!true | false => ? | !false", () => {
          expertSystem.facts = {
            A: true,
            B: false,
            C: null,
            D: false,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!false | true => true | !?", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: true,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });
    });

    describe("should handle IFF", () => {
      describe("with AND", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/iff/and.txt");
        });

        test("? + true <=> false + true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false + ? <=> false + true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false + true <=> ? + true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("true + true <=> false + ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: false,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });
      });

      describe("with OR", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/iff/or.txt");
        });

        test("? | true <=> false | true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("false | ? <=> false | true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("false | true <=> ? | true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("true | true <=> false | ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: false,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });
      });

      describe("with XOR", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/iff/xor.txt");
        });

        test("? ^ true <=> false ^ true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("false ^ ? <=> false ^ true", () => {
          expertSystem.facts = {
            A: false,
            B: null,
            C: false,
            D: true,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("false ^ true <=> ? ^ true", () => {
          expertSystem.facts = {
            A: false,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });

        test("true ^ true <=> false ^ ?", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: false,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toBeFalsy();
        });
      });

      describe("with NOT", () => {
        let expertSystem;

        beforeEach(() => {
          expertSystem = getRules("./src/assets/rules/simple/iff/not.txt");
        });

        test("!? + !true <=> !false ^ !true", () => {
          expertSystem.facts = {
            A: null,
            B: true,
            C: false,
            D: true,
          };
          const query = "A";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!true + !? <=> !true ^ !false", () => {
          expertSystem.facts = {
            A: true,
            B: null,
            C: true,
            D: false,
          };
          const query = "B";
          expect(calculate(query, expertSystem)).toEqual("undetermined");
        });

        test("!true + !true <=> !? ^ !true", () => {
          expertSystem.facts = {
            A: true,
            B: true,
            C: null,
            D: true,
          };
          const query = "C";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });

        test("!false + !false <=> !false ^ !?", () => {
          expertSystem.facts = {
            A: false,
            B: false,
            C: false,
            D: null,
          };
          const query = "D";
          expect(calculate(query, expertSystem)).toBeTruthy();
        });
      });
    });
  });
});
