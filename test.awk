BEGIN{
      print("mg=[\n");
      metal = "MG";
}

$2 == "BP" && $5 == metal && $10 != "~~" {
      split($14, a, "-");
      split(a[1], b, ":");
      split(a[2], c, ":");
      s = substr(c[2], 1, 1);
      p = substr(c[2], 2, 1);

      printf("{pdbid:\"%s\",\nmetresid:%d,\nmetchain:\"%s\",\nmetal:\"%s\",\nlink:%d,\nposition:\"%s\",\nattaching_nuc:\"%s\",\nattaching_atom=\"%s\",\nres1id:%d,\nres1chain:\"%s\",\nres2id=%d,\nres2chain:\"s\",\nres1:\"%s\",\nres2:\"s\",\nedge1:\"%s\",\nedge2:\"%s\",\norien:\"%s\",\neavl:%f,\ndist:%f,\nnumbp=%d\n},\n",
	     substr($1,0,4), 
	     $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, b[1], b[2], c[1], s, p, $15, $16, $17);
} 
