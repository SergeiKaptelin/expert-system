NAME = expert_system

all: $(NAME)

$(NAME):
	yarn install && yarn run lint && yarn run compile
	echo '#!/bin/sh' > ./expert_system
	echo 'node ./dist/expert_system/app.js "$$@"' >> ./expert_system
	chmod +x ./expert_system

clean:
	rm -rf node_modules dist build

fclean: clean
	rm -f expert_system

re: fclean all

.PHONY: all clean fclean re