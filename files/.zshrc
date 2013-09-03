# Lines configured by zsh-newuser-install
HISTFILE=~/.histfile
HISTSIZE=1000000
SAVEHIST=100000
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/var/services/homes/vagrawal/.zshrc'

export EDITOR=vim
bindkey -v ^R history-incremental-search-backward

autoload -Uz compinit
compinit
# End of lines added by compinstall

set -o vi
export PATH=$PATH:/var/services/homes/vagrawal/work/elider/pin-2.12-58423
