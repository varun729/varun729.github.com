#! /usr/bin/python

import sys      # for arguments
import re       # regex

CSS_URL         = "--css_url"
HOME_PAGE_URL   = "--home_page_url"
LINK_PAGE_URL   = "--link_page_url"
HOME_DIRECTORY  = "--home_directory"
HOME_PATH       = "--home_path"
HOME_TEMPLATE   = "--home_template"
PAGE_DIRECTORY  = "--page_directory"
PAGE_TEMPLATE   = "--page_template"
PAGE_CONTENT    = "--page_content"

RE_LIST = re.compile('%LI\[.*[^\\\\]\]\[.*[^\\\\]\]')
RE_IF = re.compile('%IF\[.*[^\\\\]\]\[.*[^\\\\]\]')
RE_VAR = re.compile('%\[\w+[^\\\\]\]')
RE_VAR_SCOPE = re.compile('%\{[\.\w]+[^\\\\]\}')
CMD_ARGS = {}

def parse_options(args):
        i = 1
        while i < len(args):
                if args[i] != PAGE_CONTENT:
                        CMD_ARGS[args[i]] = args[i+1]
                        i += 2
                        continue
                content = []
                i += 1
                while i < len(args):
                        if args[i][:2] == "--":
                                break
                        content.append(args[i])
                        i += 1
                CMD_ARGS[PAGE_CONTENT] = content

def get_page_data(page):
        dir_path = CMD_ARGS[HOME_DIRECTORY]
        page_path = dir_path + page
        fr = open(page_path, 'r')
        lines = fr.readlines()
        ws_pattern = re.compile(r'\s+')
        title = ""
        content = ""
        i = 0
        while i < len(lines):
                line = lines[i]
                # search title
                if line.find("%TITLE") >= 0:
                        while line.find("%$") < 0:
                                i += 1
                                line = lines[i].strip()
                                if line and line[0] == "%":
                                        continue
                                title += line + "\n"
                        title = re.sub(ws_pattern, ' ', title)
                # search content
                elif line.find("%CONTENT") >= 0:
                        while line.find("%$") < 0:
                                i += 1
                                line = lines[i].strip()
                                if line and line[0] == "%":
                                        continue
                                content += line + "\n"
                # search something else?
                i += 1
        fr.close()
        prefix = CMD_ARGS[LINK_PAGE_URL]
        title = title.strip()
        filename = re.sub(ws_pattern, '_', title)
        filename = filename + ".html"
        href = prefix + filename
        return {"href":href, "title":title, "content":content,
        "filename":filename}

def get_variable(line, alt_data):
        match = RE_VAR.search(line)
        while match:
                start = match.start()
                end = match.end()
                key = line[start+2:end-1]
                if CMD_ARGS.has_key("--"+key):
                        line = line.replace("%["+key+"]", CMD_ARGS["--"+key])
                elif alt_data.has_key(key):
                        line = line.replace("%["+key+"]", alt_data[key])
                else:
                        line = line.replace("%["+key+"]", "")
                        raise Exception("Key not found : "+key)
                match = RE_VAR.search(line)
                        
        return line

def get_if(line, alt_data):
        match = RE_IF.search(line)
        if not match:
                return line
        start = match.start()
        end = match.end()
        key = line[start+4:]
        key = key[0:key.index("]")]
        value = ""
        if CMD_ARGS.has_key("--"+key):
                value = CMD_ARGS["--"+key]
        elif alt_data.has_key(key):
                value = alt_data[key]
        if value:
                code = line[start+4:]
                code = code[code.index("["):]
                code = code[1:len(code)-1]
                line = code.replace("%{"+key+"}", value)
        else:
                line = ""
        return line

def get_list(line, alt_data):
        match = RE_LIST.search(line)
        if not match:
                return line
        start = match.start()
        end = match.end()
        key_iter = line[start+4:]
        key_iter = key_iter[0:key_iter.index("]")]
        key = key_iter[key_iter.index(":")+1:]
        k_iter = key_iter[0:key_iter.index(":")]
        li_str = line[start+4:]
        li_str = li_str[li_str.index("[")+1:]
        li_str = li_str[:-1]
        output = ""
        if CMD_ARGS.has_key("--"+key):
                content = CMD_ARGS["--"+key]
                for c in content:
                        data = get_page_data(c)
                        create_page(data)
                        out = li_str[:]
                        for k in data:
                                out = out.replace("%{"+k_iter+"."+k+"}", data[k])
                        output += out + "\n"
        return output

def get_line(line, alt_data = {}):
        line = get_variable(line, alt_data)
        line = get_if(line, alt_data)
        line = get_list(line, alt_data)
        return line

def create_index():
        template = CMD_ARGS[HOME_TEMPLATE]
        index_html = CMD_ARGS[HOME_PATH]
        fr = open(template, 'r')
        fw = open(index_html, 'w')
        for line in fr.readlines():
                line = line.strip()
                if line[:2] == "%%":
                        continue
                line = get_line(line)

                fw.write(line + "\n")

        fr.close()
        fw.close()

def create_page(data):
        template = CMD_ARGS[PAGE_TEMPLATE]
        page_dir = CMD_ARGS[PAGE_DIRECTORY]
        filename = data["filename"]
        path = page_dir + filename
        
        fr = open(template, 'r')
        fw = open(path, 'w')
        for line in fr.readlines():
                line = line.strip()
                if line[:2] == "%%":
                        continue
                line = get_line(line, data)

                fw.write(line + "\n")

        fr.close()
        fw.close()

if __name__ == "__main__":
        parse_options(sys.argv)
        create_index()

