with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    nodejs-16_x
  ];
  shellHook = ''
      export PATH="$PWD/node_modules/.bin:$PATH"

      if [ ! -f $PWD/node_modules/.ready ]; then
        npm install --save-dev && \
        touch $PWD/node_modules/.ready
      fi

  '';
}
