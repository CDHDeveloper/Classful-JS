@echo off

set folder=tests

for %%i in (%folder%/*) do call nodeunit %folder%/%%i
pause